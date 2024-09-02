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
  const [userData, setUserData] = useState({
    // id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products"); // Gọi API để lấy danh sách sản phẩm
      setProducts(response.data); // Sửa đổi để thiết lập products là mảng
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.get("/users"); // Gọi API để lấy danh sách sản phẩm
      setUsers(response.data); // Sửa đổi để thiết lập products là mảng
    };
    fetchUsers();
  }, []);

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
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      toast.error("Email đã tồn tại. Vui lòng sử dụng email khác.");
      return;
    }
    setUserData({ firstName, lastName, email, password });
  };

  // checkEmailExists function
  const checkEmailExists = async (email) => {
    const result = users.find((user) => user.email === email);
    console.log(`result : `, result);
    if (!result) {
      toast.success("Đăng ký thành công");
      return false;
    } else {
      console.log(result.email);
      return true;
    }
  };

  // Thêm useEffect để theo dõi sự thay đổi của userData
  useEffect(() => {
    if (
      userData.firstName &&
      userData.lastName &&
      userData.email &&
      userData.password
    ) {
      console.log(`users : `, userData);
      navigate("/login");
    }
  }, [userData]);

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
    users,
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
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setUserData,
    onSubmitHandler,
    onRegisterSubmitHandler,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
