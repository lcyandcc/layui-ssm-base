package cn.kgc.service.impl;

import cn.kgc.pojo.Dept;
import cn.kgc.service.DeptService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = false)
public class DeptServiceImpl extends BaseServiceImpl<Dept> implements DeptService {

}
