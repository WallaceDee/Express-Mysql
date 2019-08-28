/*
Navicat MySQL Data Transfer

Source Server         : x
Source Server Version : 80013
Source Host           : www.chenguohua.com.cn:3306
Source Database       : x

Target Server Type    : MYSQL
Target Server Version : 80013
File Encoding         : 65001

Date: 2019-08-28 14:49:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pal_item_category
-- ----------------------------
DROP TABLE IF EXISTS `pal_item_category`;
CREATE TABLE `pal_item_category` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `parentId` int(11) DEFAULT '0',
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for table_advertisement
-- ----------------------------
DROP TABLE IF EXISTS `table_advertisement`;
CREATE TABLE `table_advertisement` (
  `adId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `url` varchar(255) DEFAULT '',
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`adId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for table_article
-- ----------------------------
DROP TABLE IF EXISTS `table_article`;
CREATE TABLE `table_article` (
  `articleId` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `authorUserId` varchar(20) NOT NULL,
  `categoryId` varchar(20) NOT NULL,
  `updateTime` varchar(255) NOT NULL,
  `createTime` varchar(255) NOT NULL,
  PRIMARY KEY (`articleId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for table_blog
-- ----------------------------
DROP TABLE IF EXISTS `table_blog`;
CREATE TABLE `table_blog` (
  `blogId` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `authorUserId` bigint(255) DEFAULT NULL,
  `categoryId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createTime` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updateTime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`blogId`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for table_category
-- ----------------------------
DROP TABLE IF EXISTS `table_category`;
CREATE TABLE `table_category` (
  `categoryId` bigint(20) NOT NULL AUTO_INCREMENT,
  `parentId` bigint(20) NOT NULL DEFAULT '0',
  `categoryName` varchar(255) NOT NULL,
  `createTime` varchar(255) DEFAULT NULL,
  `updateTime` varchar(255) DEFAULT NULL,
  `sortIndex` bigint(255) DEFAULT '0',
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for table_comment
-- ----------------------------
DROP TABLE IF EXISTS `table_comment`;
CREATE TABLE `table_comment` (
  `commentId` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci,
  `parentId` bigint(20) DEFAULT '0',
  `authorId` bigint(20) DEFAULT NULL,
  `articleId` bigint(20) DEFAULT NULL,
  `createTime` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authorNickName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`commentId`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for table_user
-- ----------------------------
DROP TABLE IF EXISTS `table_user`;
CREATE TABLE `table_user` (
  `userId` bigint(20) NOT NULL AUTO_INCREMENT,
  `qqOpenId` varchar(255) DEFAULT NULL,
  `weiboId` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `userPassword` varchar(255) DEFAULT NULL,
  `userNickName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `userAvatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `userGender` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'u',
  `job` varchar(255) DEFAULT '',
  `signature` varchar(255) DEFAULT '',
  `userBirthday` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `userPhone` varchar(255) DEFAULT '',
  `createTime` varchar(255) DEFAULT NULL,
  `updateTime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
