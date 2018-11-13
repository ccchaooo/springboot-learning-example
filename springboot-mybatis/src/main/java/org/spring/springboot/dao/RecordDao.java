package org.spring.springboot.dao;

import org.apache.ibatis.annotations.Param;
import org.spring.springboot.domain.City;
import org.spring.springboot.domain.Record;

import java.util.List;

/**
 * Record DAO 接口类
 *
 * Created by bysocket on 07/02/2017.
 */
public interface RecordDao {

    /**
     * 查询所有的行记录
     *
     */
    List<Record> listAll();
}
