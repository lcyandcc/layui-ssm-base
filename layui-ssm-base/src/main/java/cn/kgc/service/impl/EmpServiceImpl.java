package cn.kgc.service.impl;

import cn.kgc.pojo.Emp;
import cn.kgc.service.EmpService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
public class EmpServiceImpl extends BaseServiceImpl<Emp> implements EmpService {
}
