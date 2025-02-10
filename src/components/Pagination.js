import { useState } from "react";

const usersPerPage=4;

//pagination logic for the user list
const paginatedData=(users,currentPage)=>{ 
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
   
    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    return {currentUsers,totalPages};
}

export default paginatedData;