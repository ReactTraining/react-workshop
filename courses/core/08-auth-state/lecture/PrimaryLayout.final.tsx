import * as React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import api from "YesterTech/api";
import PrimaryHeader from "./PrimaryHeader";
import PrimaryFooter from "YesterTech/PrimaryFooter";
import { useAuthDispatch, useAuthState } from "YesterTech/AuthState";
import "YesterTech/PrimaryLayout.scss";

// Route Targets
import Home from "YesterTech/Home";
import SignupForm from "YesterTech/SignupForm";
import LoginForm from "YesterTech/LoginForm";
import ProductsLayout from "YesterTech/ProductsLayout";
import ProductSubNav from "YesterTech/ProductSubNav";
import Checkout from "YesterTech/Checkout";
import { useShoppingCart } from "YesterTech/ShoppingCartState";
import { ReactFCNoChildren } from "YesterTech/types";

// import Account from 'YesterTech/Account'
const Account = React.lazy(() => import("YesterTech/Account"));

const PrimaryLayout: ReactFCNoChildren = () => {
  const history = useHistory();
  const { cart } = useShoppingCart();
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  // api.auth.getAuthenticatedUser().then(user => {})
  React.useEffect(() => {
    let isCurrent = true;
    // If we aren't athenticated on the client, we should check the server to be sure
    if (!authenticated) {
      // Get the authenticated user
      api.auth.getAuthenticatedUser().then((user) => {
        // If we find an authenticated user, dispatch the login action to update our frontend
        if (user && isCurrent) {
          dispatch({ type: "LOGIN", user });
        }
      });
      return () => {
        isCurrent = false;
      };
    }
  }, [authenticated, dispatch]);

  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <Route path="/products">
          <ProductSubNav />
        </Route>
        <main className="primary-content">
          <React.Suspense fallback={<div />}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/signup" exact>
                <SignupForm
                  onSignup={(user) => {
                    // dispatch login so the frontend is aware
                    dispatch({ type: "LOGIN", user });
                    // then redirect:
                    history.push("/");
                  }}
                />
              </Route>
              <Route path="/login" exact>
                <LoginForm
                  onAuthenticated={(user) => {
                    // dispatch login so the frontend is aware
                    dispatch({ type: "LOGIN", user });
                    // then redirect:
                    history.push("/");
                  }}
                />
              </Route>
              <Route path="/products">
                <ProductsLayout />
              </Route>
              {cart.length > 0 && (
                <Route path="/checkout">
                  <Checkout />
                </Route>
              )}
              {authenticated && (
                <Route path="/account" render={() => <Account />} />
              )}
              <Redirect to="/" />
            </Switch>
          </React.Suspense>
        </main>
        <PrimaryFooter />
      </div>
    </div>
  );
};

export default PrimaryLayout;
