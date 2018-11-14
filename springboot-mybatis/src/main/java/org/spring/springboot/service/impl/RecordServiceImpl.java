package org.spring.springboot.service.impl;

import org.spring.springboot.dao.RecordDao;
import org.spring.springboot.domain.Record;
import org.spring.springboot.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 城市业务逻辑实现类
 *
 * Created by bysocket on 07/02/2017.
 */
@Service
public class RecordServiceImpl implements RecordService {

    @Autowired
    protected RecordDao recordDao;

    @Override
    public List<Record> findAllRecord() {
        return recordDao.findAllRecord();
    }

}
