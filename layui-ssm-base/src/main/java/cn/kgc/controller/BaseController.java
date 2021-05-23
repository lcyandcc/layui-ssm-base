package cn.kgc.controller;

import cn.kgc.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

public class BaseController<T> {
    @Autowired
    private BaseService<T> baseService;
    //异步请求加载员工和部门数据
    @RequestMapping("loadData")
    @ResponseBody//只返回数据JSON数据
    public Map<String,Object> loadData(Integer page, Integer limit){
        System.out.println("page = " + page);
        System.out.println("limit = " + limit);
        Map<String,Object> map=null;
        try {
            map=baseService.findTByPage(page,limit);
            map.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",200);
            map.put("msg","数据访问失败");
        }
        return map;
    }

    @RequestMapping("loadDataByParams")
    @ResponseBody//只返回数据JSON数据
    public Map<String,Object> loadDataByParams(Integer page, Integer limit, T t){
        System.out.println("page = " + page);
        System.out.println("limit = " + limit);
        Map<String,Object> map=null;
        try {
            map=baseService.findTByPageAndParams(page,limit,t);
            map.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",200);
            map.put("msg","数据访问失败");
        }
        return map;
    }

    //根据主键id删除单条数据
    @RequestMapping("delTById")
    @ResponseBody
    public String delTById(Integer id){
        try {
            return baseService.removeTById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
    //根据多个主键id删除多条数据
    @RequestMapping("delBatchTByIds")
    @ResponseBody
    public String delBatchTByIds(Integer[] ids){
        try {
            return baseService.removeBatchTByIds(ids);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    //添加一条数据
    @RequestMapping("saveT")
    @ResponseBody
    public String saveT(T t){
        try {
            return baseService.saveT(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }


    //动态修改数据
    @RequestMapping("updT")
    @ResponseBody
    public String updT(T t){
        try {
            return baseService.modifyT(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }


    //查询所有数据
    @RequestMapping("loadAllT")
    @ResponseBody
    public List<T> loadAllT(){
        try {
            return baseService.findTAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
