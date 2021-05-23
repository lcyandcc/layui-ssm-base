package cn.kgc.service.impl;

import cn.kgc.dao.BaseMapper;
import cn.kgc.pojo.Emp;
import cn.kgc.service.BaseService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BaseServiceImpl<T> implements BaseService<T> {
    @Autowired
    private BaseMapper<T> baseMapper;
    @Override
    public Map<String, Object> findTByPage(Integer page, Integer limit) {
        Map<String,Object> map=new HashMap<>();
        //1.开启分页查询
        PageHelper.startPage(page,limit);
        //2.查询数据
        List<T> list = baseMapper.selAllTByPage();
        //3.封装数据
        PageInfo pageInfo = new PageInfo(list);
        map.put("count",pageInfo.getTotal());
        map.put("data",pageInfo.getList());
        return map;
    }

    @Override
    public Map<String, Object> findTByPageAndParams(Integer page, Integer limit, T t) {
        Map<String,Object> map=new HashMap<>();
        //1.开启分页查询
        PageHelper.startPage(page,limit);
        //2.查询数据
        List<T> list = baseMapper.selAllTByPageParams(t);
        //3.封装数据
        PageInfo pageInfo = new PageInfo(list);
        map.put("count",pageInfo.getTotal());
        map.put("data",pageInfo.getList());
        return map;
    }

    @Override
    public String removeTById(Integer id) {
        if (baseMapper.deleteByPrimaryKey(id)>0){
            return "success";
        }
        return "fail";
    }

    @Override
    public String removeBatchTByIds(Integer[] ids) {
        if (baseMapper.delBatchTByIds(ids)>0){
            return "success";
        }
        return "fail";
    }

    @Override
    public String saveT(T t) {
        if (baseMapper.insert(t)>0){
            return "success";
        }
        return "fail";
    }

    @Override
    public String modifyT(T t) {
        if (baseMapper.updateByPrimaryKeySelective(t)>0){
            return "success";
        }
        return "fail";
    }

    @Override
    public List<T> findTAll() {
        return baseMapper.selTAll();
    }
}
