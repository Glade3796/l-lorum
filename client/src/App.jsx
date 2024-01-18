import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Posts from "./pages/Posts"
import WritePost from "./pages/WritePost"


export  default function App(){
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/write" element={<WritePost></WritePost>}></Route>
        <Route path="/posts" element={<Posts></Posts>}></Route>
        
      </Routes>
    </div>
  )
}