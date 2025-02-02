import React from "react";
import { withAuth } from "../HOC";

function AuthenticationTest() {
  return (
    <div>
      This page can be accessed ny any logged in user.(Means checking
      Authentication)
    </div>
  );
}

export default withAuth(AuthenticationTest);
