package org.spring.springboot.domain;

/**
 * @author dengchao
 */
public class Record {
    private String c_rid;
    private Integer n_index;
    private Double n_price;
    private String d_checkdin;
    private String d_checkout;
    private Integer plateid;
    private Double platerate;
    private String platename;
    private Integer n_days;
    private Double n_discount;
    private Double n_theoreticalincome;
    private Double fee;
    private Double n_actualincome;
    private String unusual;

    public String getC_rid() {
        return c_rid;
    }

    public void setC_rid(String c_rid) {
        this.c_rid = c_rid;
    }

    public Integer getN_index() {
        return n_index;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Record)) return false;

        Record record = (Record) o;

        if (!getC_rid().equals(record.getC_rid())) return false;
        return getN_index().equals(record.getN_index());
    }

    @Override
    public String toString() {
        return "Record{" +
                "c_rid='" + c_rid + '\'' +
                ", n_index=" + n_index +
                ", n_price=" + n_price +
                ", d_checkdin='" + d_checkdin + '\'' +
                ", d_checkout='" + d_checkout + '\'' +
                ", plateid=" + plateid +
                ", platerate=" + platerate +
                ", platename='" + platename + '\'' +
                ", n_days=" + n_days +
                ", n_discount=" + n_discount +
                ", n_theoreticalincome=" + n_theoreticalincome +
                ", fee=" + fee +
                ", n_actualincome=" + n_actualincome +
                ", unusual='" + unusual + '\'' +
                ", comments='" + comments + '\'' +
                ", n_total=" + n_total +
                '}';
    }

    @Override
    public int hashCode() {
        int result = getC_rid().hashCode();
        result = 31 * result + getN_index().hashCode();
        return result;
    }

    public void setN_index(Integer n_index) {
        this.n_index = n_index;

    }

    public Double getN_price() {
        return n_price;
    }

    public void setN_price(Double n_price) {
        this.n_price = n_price;
    }

    public String getD_checkdin() {
        return d_checkdin;
    }

    public void setD_checkdin(String d_checkdin) {
        this.d_checkdin = d_checkdin;
    }

    public String getD_checkout() {
        return d_checkout;
    }

    public void setD_checkout(String d_checkout) {
        this.d_checkout = d_checkout;
    }

    public Integer getPlateid() {
        return plateid;
    }

    public void setPlateid(Integer plateid) {
        this.plateid = plateid;
    }

    public Double getPlaterate() {
        return platerate;
    }

    public void setPlaterate(Double platerate) {
        this.platerate = platerate;
    }

    public String getPlatename() {
        return platename;
    }

    public void setPlatename(String platename) {
        this.platename = platename;
    }

    public Integer getN_days() {
        return n_days;
    }

    public void setN_days(Integer n_days) {
        this.n_days = n_days;
    }

    public Double getN_discount() {
        return n_discount;
    }

    public void setN_discount(Double n_discount) {
        this.n_discount = n_discount;
    }

    public Double getN_theoreticalincome() {
        return n_theoreticalincome;
    }

    public void setN_theoreticalincome(Double n_theoreticalincome) {
        this.n_theoreticalincome = n_theoreticalincome;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }

    public Double getN_actualincome() {
        return n_actualincome;
    }

    public void setN_actualincome(Double n_actualincome) {
        this.n_actualincome = n_actualincome;
    }

    public String getUnusual() {
        return unusual;
    }

    public void setUnusual(String unusual) {
        this.unusual = unusual;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Double getN_total() {
        return n_total;
    }

    public void setN_total(Double n_total) {
        this.n_total = n_total;
    }

    private String comments;
    private Double n_total;
}
