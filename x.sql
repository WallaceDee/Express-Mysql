/*
Navicat MySQL Data Transfer

Source Server         : h
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : x

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2017-11-08 16:26:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `table_user`
-- ----------------------------
DROP TABLE IF EXISTS `table_user`;
CREATE TABLE `table_user` (
  `userId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userOpenId` varchar(255) DEFAULT NULL,
  `userName` varchar(255) NOT NULL DEFAULT '游客',
  `userPassword` varchar(16) NOT NULL,
  `userNickName` varchar(255) DEFAULT NULL,
  `userAvatar` varchar(255) DEFAULT NULL,
  `userBirthday` varchar(255) DEFAULT NULL,
  `userPhone` varchar(255) DEFAULT NULL,
  `userGender` int(1) unsigned zerofill DEFAULT '0',
  `createTime` varchar(255) DEFAULT NULL,
  `updateTime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_user
-- ----------------------------
INSERT INTO `table_user` VALUES ('28', null, 'admin', 'admin', null, '/upload/user_avatar/ad9f8ea0-b56c-11e7-a2f9-9992c1811d66.png', null, '13570437475', '1', '2017-11-20 11:04:11', '2017-11-08 15:53:59');
INSERT INTO `table_user` VALUES ('30', null, 'test', '1', null, '/upload/user_avatar/ad9f8ea0-b56c-11e7-a2f9-9992c1811d66.png', null, '', '1', '2017-10-19 17:36:24', '2017-10-30 10:04:58');
INSERT INTO `table_user` VALUES ('32', null, '123', '123', '陈国华', 'upload/user_avatar/f0f22130-c44f-11e7-9404-db8324cab383.png', '2017-11-04', '12345678901', '0', '2017-10-23 15:50:04', '2017-11-08 16:24:46');
INSERT INTO `table_user` VALUES ('36', null, '234', '23423', null, '/upload/user_avatar/ad9f8ea0-b56c-11e7-a2f9-9992c1811d66.png', null, '1', '0', '2017-10-23 16:07:47', '2017-10-23 16:07:47');
INSERT INTO `table_user` VALUES ('37', null, '123123', '213', null, '/upload/user_avatar/ad9f8ea0-b56c-11e7-a2f9-9992c1811d66.png', null, '1', '0', '2017-10-23 16:13:31', '2017-10-23 16:13:31');
INSERT INTO `table_user` VALUES ('38', null, '333', '11122', null, null, null, null, '0', '2017-11-08 11:42:33', '2017-11-08 11:42:33');
INSERT INTO `table_user` VALUES ('39', null, '123', '123', '陈国华', 'upload/user_avatar/f0f22130-c44f-11e7-9404-db8324cab383.png', '2017-11-04', null, '0', '2017-11-08 11:43:10', '2017-11-08 16:24:46');
INSERT INTO `table_user` VALUES ('40', null, '1994', '123', null, null, null, null, '0', '2017-11-08 11:52:12', '2017-11-08 13:28:17');
INSERT INTO `table_user` VALUES ('41', null, 'qwe', 'qwe', '葛銊扄搈', 'upload/user_avatar/fb6ded90-c451-11e7-a7ed-a5fc491bebc2.png', '2017-11-05 00:00:00', '13202627449', '0', '2017-11-08 14:55:57', '2017-11-08 15:43:25');
