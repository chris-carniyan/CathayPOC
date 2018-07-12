CREATE TABLE crm_gift_file_history(seq_no number primary key, file_name varchar(50), date_created timestamp);
CREATE TABLE crm_gift_details(seq_no number primary key, file_seq_no number, pid varchar(12), p_name varchar(100), f_flag varchar(1), f_cnt number, f_amt number, t_flag varchar(1), t_amt number);

CREATE SEQUENCE  crm_gift_details_seq;
CREATE SEQUENCE  crm_gift_file_history_seq;

CREATE SEQUENCE crm_gift_trans_seq;



--drop table crm_gift_file_history;
--drop table  crm_gift_details;
--drop sequence  crm_gift_details_seq;
--drop sequence  crm_gift_file_history_seq;
--drop sequence  crm_gift_trans_seq;




