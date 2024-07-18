'use client'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Chip from '@mui/material/Chip'

// Component Imports
import { SubMenu as HorizontalSubMenu, MenuItem as HorizontalMenuItem } from '@menu/horizontal-menu'
import { SubMenu as VerticalSubMenu, MenuItem as VerticalMenuItem, MenuSection } from '@menu/vertical-menu'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Generate a menu from the menu data array
export const GenerateVerticalMenu = ({ menuData }) => {
  // Hooks
  const { lang: locale } = useParams()

  const renderMenuItems = data => {
    // Use the map method to iterate through the array of menu data
    return data.map((item, index) => {
      const menuSectionItem = item
      const subMenuItem = item
      const menuItem = item
      const icon = <i className={menuItem.icon} />

      // Check if the current item is a section
      if (menuSectionItem.isSection) {
        const { children, isSection, ...rest } = menuSectionItem

        // If it is, return a MenuSection component and call generateMenu with the current menuSectionItem's children
        return (
          <MenuSection key={index} {...rest}>
            {children && renderMenuItems(children)}
          </MenuSection>
        )
      }

      // Check if the current item is a sub menu
      if (subMenuItem.children) {
        const { children, prefix, suffix, ...rest } = subMenuItem
        const subMenuPrefix = prefix && prefix.label ? <Chip size='small' {...prefix} /> : prefix
        const subMenuSuffix = suffix && suffix.label ? <Chip size='small' {...suffix} /> : suffix

        // If it is, return a SubMenu component and call generateMenu with the current subMenuItem's children
        return (
          <VerticalSubMenu key={index} prefix={subMenuPrefix} suffix={subMenuSuffix} {...rest} icon={icon}>
            {children && renderMenuItems(children)}
          </VerticalSubMenu>
        )
      }

      // Localize the href
      const href = menuItem.href?.startsWith('http')
        ? menuItem.href
        : menuItem.href && getLocalizedUrl(menuItem.href, locale)

      // If the current item is neither a section nor a sub menu, return a MenuItem component
      const { prefix, suffix, ...rest } = menuItem
      const menuItemPrefix = prefix && prefix.label ? <Chip size='small' {...prefix} /> : prefix
      const menuItemSuffix = suffix && suffix.label ? <Chip size='small' {...suffix} /> : suffix

      return (
        <VerticalMenuItem key={index} prefix={menuItemPrefix} suffix={menuItemSuffix} {...rest} icon={icon} href={href}>
          {menuItem.label}
        </VerticalMenuItem>
      )
    })
  }

  return <>{renderMenuItems(menuData)}</>
}

// Generate a menu from the menu data array
export const GenerateHorizontalMenu = ({ menuData }) => {
  // Hooks
  const { lang: locale } = useParams()

  const renderMenuItems = data => {
    // Use the map method to iterate through the array of menu data
    return data.map((item, index) => {
      const subMenuItem = item
      const menuItem = item
      const icon = <i className={menuItem.icon} />

      // Check if the current item is a sub menu
      if (subMenuItem.children) {
        const { children, prefix, suffix, ...rest } = subMenuItem
        const subMenuPrefix = prefix && prefix.label ? <Chip size='small' {...prefix} /> : prefix
        const subMenuSuffix = suffix && suffix.label ? <Chip size='small' {...suffix} /> : suffix

        // If it is, return a SubMenu component and call generateMenu with the current subMenuItem's children
        return (
          <HorizontalSubMenu key={index} prefix={subMenuPrefix} suffix={subMenuSuffix} {...rest} icon={icon}>
            {children && renderMenuItems(children)}
          </HorizontalSubMenu>
        )
      }

      // Localize the href
      const href = menuItem.href?.startsWith('http')
        ? menuItem.href
        : menuItem.href && getLocalizedUrl(menuItem.href, locale)

      // If the current item is not a sub menu, return a MenuItem component
      const { prefix, suffix, ...rest } = menuItem
      const menuItemPrefix = prefix && prefix.label ? <Chip size='small' {...prefix} /> : prefix
      const menuItemSuffix = suffix && suffix.label ? <Chip size='small' {...suffix} /> : suffix

      return (
        <HorizontalMenuItem
          key={index}
          prefix={menuItemPrefix}
          suffix={menuItemSuffix}
          {...rest}
          icon={icon}
          href={href}
        >
          {menuItem.label}
        </HorizontalMenuItem>
      )
    })
  }

  return <>{renderMenuItems(menuData)}</>
}
