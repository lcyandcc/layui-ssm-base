import cn.kgc.pojo.Dept;
import cn.kgc.pojo.Emp;
import cn.kgc.service.BaseService;
import cn.kgc.service.EmpService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;
import java.util.Map;

//指定在单元测试启动的时候创建spring的工厂类对象
@ContextConfiguration(locations = {"classpath:spring-config.xml"})
//RunWith的value属性指定以spring test的SpringJUnit4ClassRunner作为启动类
//如果不指定启动类，默认启用的junit中的默认启动类
@RunWith(value = SpringJUnit4ClassRunner.class)
public class MyTest {
    @Autowired
    private BaseService<Emp> baseService;
    @Test
    public void test01() {
        Map<String, Object> map = baseService.findTByPage(2, 3);
        Long count = (Long) map.get("count");
        List<Emp> empList = (List<Emp>) map.get("data");
        for (Emp emp : empList) {
            System.out.println(emp.getDeptno() + ", " + emp.getEname());
            System.out.println("======================================");
            Dept dept = emp.getDept();
            System.out.println(dept);
        }
    }
}
