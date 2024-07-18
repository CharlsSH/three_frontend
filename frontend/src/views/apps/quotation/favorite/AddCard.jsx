"use client";

// React Imports
import { useState } from "react";
import Link from "next/link";

// MUI Imports
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

// Third-party Imports
import classnames from "classnames";

// Component Imports
import AddCustomerDrawer, { initialFormData } from "./AddCustomerDrawer";
import Logo from "@components/layout/shared/Logo";
import CustomTextField from "@core/components/mui/TextField";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 4,
  px: 14,
  pb: 4,
};

const AddAction = ({ resData }) => {
  // States
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [selectData, setSelectData] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [modalVisible, setVisibleModal] = useState(false);
  const [url, setUrl] = useState("");
  const [statusOrder, setStatusOrder] = useState(false);
  const [statusFavor, setStatusFavor] = useState(false);

  // Hooks
  const isBelowMdScreen = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );
  const isBelowSmScreen = useMediaQuery((theme) =>
    theme.breakpoints.down("sm")
  );

  const onFormSubmit = (data) => {
    setFormData(data);
  };

  const showModal = (url, id) => {
    setUrl(url);
    setVisibleModal(true);
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  return (
    <>
      <Card>
        <CardContent className="sm:!p-12">
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <div className="p-6 bg-actionHover rounded">
                <div className="flex justify-between gap-4 flex-col sm:flex-row">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2.5">
                      <Logo />
                    </div>
                    <div>
                      <Typography color="text.primary">
                        This is field quotation
                      </Typography>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      fullWidth
                      target="_blank"
                      component={Link}
                      variant="contained"
                      className="capitalize"
                      href="https://google.com"
                      startIcon={
                        <i
                          className="tabler-circle-plus"
                          style={{ fontSize: 20 }}
                        />
                      }
                    >
                      Create Quotation
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="flex justify-between flex-col gap-4 flex-wrap sm:flex-row">
                <div className="flex flex-col gap-4">
                  <Typography className="font-medium" color="text.primary">
                    New Customer:
                  </Typography>
                  <CustomTextField
                    select
                    className={classnames("min-is-[220px]", {
                      "is-1/2": isBelowSmScreen,
                    })}
                    value={selectData?.id || ""}
                    onChange={(e) => {
                      setFormData({});
                      setSelectData(
                        resData
                          .slice(0, 5)
                          .filter((item) => item.id === e.target.value)[0]
                      );
                    }}
                  >
                    <MenuItem
                      className="flex items-center gap-2 !text-error !bg-transparent hover:text-error hover:!bg-[var(--mui-palette-error-lightOpacity)]"
                      value=""
                      onClick={() => {
                        setSelectData(null);
                        setOpen(true);
                      }}
                    >
                      <i className="tabler-plus text-base" />
                      Add New Customer
                    </MenuItem>
                  </CustomTextField>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider className="border-dashed" />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button onClick={() => setStatusOrder((prev) => !prev)}>
                {statusOrder ? (
                  <i className="tabler-sort-descending" />
                ) : (
                  <i className="tabler-sort-ascending" />
                )}
              </Button>
            </Grid>
            {resData.map((item, index) => (
              <Grid item xs={3} key={index}>
                <Card sx={12}>
                  <CardContent>
                    <Grid container style={{ alignItems: "center" }}>
                      <Grid item xs={10}>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography sx={{ fontSize: 14 }}>
                          <Button
                            onClick={() => setStatusFavor((prev) => !prev)}
                          >
                            {statusFavor ? (
                              <i className="tabler-heart" />
                            ) : (
                              <i className="tabler-heart-filled" />
                            )}
                          </Button>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h5"
                      component="div"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={item.url}
                        onClick={() => showModal(item.url, item.id)}
                        style={{
                          cursor: "pointer",
                        }}
                        className="object-contain bs-[100px] md:bs-[150px] lg:bs-[200px] mbs-10 md:mbs-14 lg:mbs-20"
                      />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="default"
                      component={Link}
                      target="_blank"
                      href={`https://google.com/${item.id}`}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Divider className="border-dashed" />
            </Grid>
            <Grid item xs={12}>
              {Array.from(Array(count).keys()).map((item, index) => (
                <div
                  key={index}
                  className={classnames(
                    "repeater-item flex relative mbe-4 border rounded",
                    {
                      "mbs-8": !isBelowMdScreen,
                      "!mbs-14": index !== 0 && !isBelowMdScreen,
                      "gap-5": isBelowMdScreen,
                    }
                  )}
                ></div>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <AddCustomerDrawer
        open={open}
        setOpen={setOpen}
        onFormSubmit={onFormSubmit}
      />
      <Modal
        open={modalVisible}
        onClose={closeModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <Grid
            container
            spacing={6}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid item xs={6}>
              <img
                src={url}
                className="object-contain bs-[300px] md:bs-[350px] lg:bs-[400px] mbs-10 md:mbs-14 lg:mbs-20"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <div className="flex justify-between flex-col gap-4 flex-wrap sm:flex-row">
                <div className="flex flex-col gap-4">
                  <Typography className="font-medium" color="text.primary">
                    Select Customer:
                  </Typography>
                  <CustomTextField
                    select
                    className={classnames("min-is-[220px]", {
                      "is-1/2": isBelowSmScreen,
                    })}
                    value={selectData?.id || ""}
                    onChange={(e) => {
                      setFormData({});
                      setSelectData(
                        resData
                          .slice(0, 5)
                          .filter((item) => item.id === e.target.value)[0]
                      );
                    }}
                  >
                    {resData.slice(0, 5).map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                  {selectData?.id ? (
                    <div>
                      <Typography>{selectData?.name}</Typography>
                      <Typography>{selectData?.company}</Typography>
                      <Typography>{selectData?.address}</Typography>
                      <Typography>{selectData?.contact}</Typography>
                      <Typography>{selectData?.companyEmail}</Typography>
                    </div>
                  ) : (
                    <div>
                      <Typography>{formData?.name}</Typography>
                      <Typography>{formData?.company}</Typography>
                      <Typography>{formData?.address}</Typography>
                      <Typography>{formData?.contactNumber}</Typography>
                      <Typography>{formData?.email}</Typography>
                    </div>
                  )}
                </div>
              </div>{" "}
              <div className="flex justify-between flex-col gap-4 flex-wrap sm:flex-row mt-4">
                <div className="flex flex-col gap-4">
                  <Typography className="font-medium" color="text.primary">
                    Send Customer:
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label="Content"
                    multiline
                    rows={4}
                    placeholder="Input the content"
                  />
                </div>
              </div>{" "}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => window.print()} className="mt-4">
                  <i className="tabler-printer" />
                  Print
                </Button>
                <Button onClick={() => setVisibleModal(false)} className="mt-4">
                  <i className="tabler-send" /> Send
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default AddAction;
