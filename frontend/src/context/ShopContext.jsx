import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [newUserData, setNewUserData] = useState({
    newName: "",
    newEmail: "",
    newPassword: "",
  });
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products"); // Gọi API để lấy danh sách sản phẩm
      setProducts(response.data); // Sửa đổi để thiết lập products là mảng
    };
    fetchProducts();
  }, []); // Thêm refresh vào dependency array

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setUserData({ email, password });
    // Chờ cho userData được cập nhật
    // setLoginStatus(true);
    console.log("login: ", userData);
    navigate("/");
  };
  const onRegisterSubmitHandler = async (event) => {
    event.preventDefault();
    setNewUserData({ name, email, password });
    // Chờ cho userData được cập nhật
    // setLoginStatus(true);
    console.log("signup: ", newUserData);
    navigate("/login");
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    // Kiểm tra xem itemId có tồn tại trong cartItems không
    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity; // Cập nhật số lượng
    } else {
      console.error(cartData[itemId]);
    }
    setCartItems(cartData);
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product.pid === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    setName,
    setEmail,
    setPassword,
    setNewName,
    setNewEmail,
    setNewPassword,
    onSubmitHandler,
    onRegisterSubmitHandler,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
