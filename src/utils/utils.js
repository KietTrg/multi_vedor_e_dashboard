import io from "socket.io-client";
export const overideStyle = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
};

export const socket = io("http://localhost:5000");
