package cn.kgc.controller;

import cn.kgc.pojo.Emp;
import cn.kgc.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;
//@RestController  // 只返回数据，不返回视图 @controller + @responseBody
@Controller
@RequestMapping("emp")
public class EmpController extends BaseController<Emp> {

}
