package org.spring.springboot.controller;

import org.spring.springboot.domain.City;
import org.spring.springboot.domain.Record;
import org.spring.springboot.service.CityService;
import org.spring.springboot.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by bysocket on 07/02/2017.
 */
@RestController
public class CityRestController {

    @Autowired
    private CityService cityService;

    @Autowired
    private RecordService recordService;

    @RequestMapping(value = "/api/city", method = RequestMethod.GET)
    public City findOneCity(@RequestParam(value = "cityName", required = false,defaultValue = "city_name") String cityName) {
        return cityService.findCityByName(cityName);
    }

    @RequestMapping(value = "/query")
    public List<Record> findAllrecord(){
        return recordService.findAllRecord();
    }

    @RequestMapping(value = "/home")
    public String home() {
        return "/function/home/home";

    }
}
