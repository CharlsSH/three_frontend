// MUI Imports
import Grid from "@mui/material/Grid";

// MUI Imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

// Server Action Imports
import { getServerMode } from "@core/utils/serverHelpers";
import { Button } from "@mui/material";

const ProductList = () => {
  // Vars
  const serverMode = getServerMode();

  return (
    <Card>
      <CardHeader
        className='text-end'
        action={<Button variant="contained">Create</Button>}
      />
    </Card>
  );
};

export default ProductList;
