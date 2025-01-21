package com.booklibrary.api.gateway.controller;

import net.minidev.json.JSONArray;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/home")
public class HomeController {
    @GetMapping
    public String getHome(){
        List<String> data = new ArrayList<>();
        data.add("Home Page");
        return JSONArray.toJSONString(data);
    }
}
