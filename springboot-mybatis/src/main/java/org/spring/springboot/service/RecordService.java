package org.spring.springboot.service;

import org.spring.springboot.domain.City;
import org.spring.springboot.domain.Record;

import java.util.List;

/**
 * 城市业务逻辑接口类
 *
 * Created by bysocket on 07/02/2017.
 */
public interface RecordService {

    /**
     * 获取所有的记录
     */
    List<Record> findAllRecord();
}
