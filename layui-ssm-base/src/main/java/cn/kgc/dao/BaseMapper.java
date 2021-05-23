package cn.kgc.dao;

import cn.kgc.pojo.Dept;
import cn.kgc.pojo.Emp;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface BaseMapper<T> {
    //根据主键ID删除单个数据
    int deleteByPrimaryKey(Integer id);
    //插入单条数据
    int insert(T t);
    //动态插入单个数据
    int insertSelective(T t);
    //根据主键ID查询单个数据
    T selectByPrimaryKey(Integer id);
    //根据单个实体，动态修改数据
    int updateByPrimaryKeySelective(T t);
    //根据单个实体，修改数据
    int updateByPrimaryKey(T t);
    //分页查询所有数据
    List<T> selAllTByPage();
    //根据条件查询数据
    List<T>selAllTByPageParams(T t);
    //根据多个主键ID批量删除数据
    int delBatchTByIds(@Param("ids") Integer[] ids);
    //查询所有的数据
    List<T> selTAll();
}
