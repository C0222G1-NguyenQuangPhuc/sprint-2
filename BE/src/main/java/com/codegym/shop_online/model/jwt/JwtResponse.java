package com.codegym.shop_online.model.jwt;

import java.util.List;

public class JwtResponse{

    private List<String> grantList;
    private String username;

    public JwtResponse(List<String> grantList, String username) {
        this.grantList = grantList;
        this.username = username;
    }


    public List<String> getGrantList() {
        return grantList;
    }


    public String getUsername() {
        return username;
    }
}
