import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../app/store/store";
import { Product } from "../app/models/Product";

const ProductFacility = () => {
  const { productStore } = useStore();
  const { getAllProducts, createProducts, deleteProduct } = productStore;
  const [productId, setProductId] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [myCash, setMyCash] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const [newProduct, setNewProduct] = useState<Product>({
    productId: 0,
    productName: "",
    cost: 0,
    quantity: 0,
  });

  const getProducts = (search: string) => {
    getAllProducts(search)
      .then((result) => {
        setProducts(result);
        setProductId(result?.length! + 1);
        console.log(result);
      })
      .catch((e) => {
        console.log("error: " + e);
      });
  };
  useEffect(() => {
    getProducts(search);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createProducts(newProduct)
      .then((result) => {
        setTotalAmount(result);
        getProducts("");
      })
      .catch((e) => {
        console.log("error in saving: " + e);
      });
  };

  const handleDelete = (id: number) => {
    deleteProduct(id).then(() => {
      getProducts("");
    });
  };

  const handleSetChange = () => {
    setChange(myCash - totalAmount);
  };

  return (
    <>
      <label>Product ID: {productId}</label>
      <br />
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          label="Product Name"
          value={newProduct.productName}
          onChange={(e: any) => {
            setNewProduct({ ...newProduct, productName: e.target.value });
          }}
        />
        <br />
        <TextField
          variant="standard"
          label="Cost"
          value={newProduct.cost}
          onChange={(e: any) => {
            setNewProduct({ ...newProduct, cost: e.target.value });
          }}
        />
        <br />
        <TextField
          variant="standard"
          label="Quantity"
          value={newProduct.quantity}
          onChange={(e: any) => {
            setNewProduct({ ...newProduct, quantity: e.target.value });
          }}
        />
        <br />
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Add to Cart
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Id</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((item, index) => (
              <>
                <TableRow key={index}>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.cost}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleDelete(item.productId);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <br />
      <TextField
        variant="standard"
        label="Total Amount"
        value={totalAmount}
        disabled
      />
      <br />
      <TextField
        variant="standard"
        label="Cash"
        value={myCash}
        onChange={(e: any) => {
          setMyCash(e.target.value);
        }}
      />
      <br />
      <TextField variant="standard" label="Change" value={change} />
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          handleSetChange();
        }}
      >
        Save
      </Button>
    </>
  );
};

export default observer(ProductFacility);
