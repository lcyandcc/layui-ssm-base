package cn.kgc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequestMapping("model")
public class ModelController {
    @RequestMapping("showEmpUI")
    public String showEmpUI(){
        return "showEmp";
    }
}
