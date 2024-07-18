// MUI Imports
import Grid from "@mui/material/Grid";

// Component Imports
import AddCard from "@/views/apps/quotation/favorite/AddCard";

const QuotationFavor= async () => {
  // Vars
  const now = new Date();
  const currentMonth = now.toLocaleString("default", { month: "short" });
  const data = [
    {
      id: "1",
      issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
      address: "7777 Mendez Plains",
      company: "Hall-Robbins PLC",
      companyEmail: "don85@johnson.com",
      country: "USA",
      contact: "(616) 865-4180",
      name: "Door of shop in Mendez Plains",
      total: 100,
      avatarColor: "primary",
      invoiceStatus: "Paid",
      url: '/images/illustrations/characters/1.png',
      balance: "$724",
      dueDate: `23 ${currentMonth} ${now.getFullYear()}`,
    },
    {
      id: "3",
      issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
      address: "7777 Mendez Plains",
      company: "Hall-Robbins PLC",
      companyEmail: "don85@johnson.com",
      country: "USA",
      contact: "(616) 865-4180",
      name: "Door of shop in Mendez Plains",
      total: 100,
      avatarColor: "primary",
      invoiceStatus: "Paid",
      url: '/images/illustrations/characters/3.png',
      balance: "$724",
      dueDate: `23 ${currentMonth} ${now.getFullYear()}`,
    },
    {
      id: "5",
      issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
      address: "7777 Mendez Plains",
      company: "Hall-Robbins PLC",
      companyEmail: "don85@johnson.com",
      country: "USA",
      contact: "(616) 865-4180",
      name: "Door of shop in Mendez Plains",
      total: 100,
      avatarColor: "primary",
      invoiceStatus: "Paid",
      url: '/images/illustrations/characters/5.png',
      balance: "$724",
      dueDate: `23 ${currentMonth} ${now.getFullYear()}`,
    },
    {
      id: "7",
      issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
      address: "7777 Mendez Plains",
      company: "Hall-Robbins PLC",
      companyEmail: "don85@johnson.com",
      country: "USA",
      contact: "(616) 865-4180",
      name: "Door of shop in Mendez Plains",
      total: 100,
      avatarColor: "primary",
      invoiceStatus: "Paid",
      url: '/images/illustrations/characters/7.png',
      balance: "$724",
      dueDate: `23 ${currentMonth} ${now.getFullYear()}`,
    }
  ];

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <AddCard resData={data} />
      </Grid>
    </Grid>
  );
};

export default QuotationFavor;
