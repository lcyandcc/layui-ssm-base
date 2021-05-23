package cn.kgc.controller;

import cn.kgc.pojo.Dept;
import cn.kgc.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RequestMapping("dept")
public class DeptController extends BaseController<Dept> {


}
