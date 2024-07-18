// MUI Imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Third-party Imports
import classnames from "classnames";

// Components Imports
import OptionMenu from "@core/components/option-menu";
import { Avatar } from "@mui/material";

// Vars
const data = [
  {
    title: "New Clients",
    subtitle: "2",
    imgSrc: "/images/illustrations/objects/pricing-basic.png",
    borderColor: 'lightblue'
  },
  {
    title: "New Client Revenue",
    subtitle: "125",
    imgSrc: "/images/illustrations/objects/pricing-enterprise.png",
    borderColor: 'orange'
  },
  {
    title: "New Client Profit",
    subtitle: "116",
    imgSrc: "/images/illustrations/objects/pricing-standard.png",
    borderColor: 'lightpink'
  },
];

const SalesByCountries = () => {
  return (
    <Card>
      <CardHeader title="New Customer Profit" subheader="" />
      <CardContent className="flex flex-col gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3"
            style={{ boxShadow: '8px 8px 8px 8px rgba(0, 0, 1, .1)', borderLeft: `4px solid ${item.borderColor}`, borderRadius: 10 }}
          >
            {/* <img src={item.imgSrc} alt={item.subtitle} width={34} /> */}
            <Avatar src={item.imgSrc} width={32} />
            <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full">
              <div className="flex flex-col">
                <Typography className="font-medium" color="text.primary">
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.subtitle}</Typography>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SalesByCountries;
