-- CreateTable
CREATE TABLE `beacons` (
    `beacon_id` INTEGER NOT NULL AUTO_INCREMENT,
    `proximity_uuid` VARCHAR(255) NOT NULL,
    `major` INTEGER NOT NULL,
    `minor` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `beacons_proximity_uuid_key`(`proximity_uuid`),
    PRIMARY KEY (`beacon_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `days` (
    `day_id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`day_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `devices` (
    `device_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `mac_address` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`device_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presences` (
    `presence_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_schedule_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `is_open` BOOLEAN NOT NULL DEFAULT false,
    `waiting_room` BOOLEAN NOT NULL DEFAULT false,
    `open_time` TIME(0) NOT NULL,
    `close_time` TIME(0) NULL,
    `presence_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`presence_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presences_details` (
    `presence_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `presence_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `presence_time` TIME(0) NOT NULL,
    `presence_date` DATE NOT NULL,
    `is_inclass` BOOLEAN NOT NULL DEFAULT false,
    `is_admited` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`presence_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `beacon_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `room_code` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `study_groups` (
    `study_group_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`study_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subjects` (
    `subject_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`subject_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subjects_schedules` (
    `subject_schedule_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `study_group_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `day_id` INTEGER NOT NULL,
    `start_time` TIME(0) NOT NULL,
    `finish_time` TIME(0) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`subject_schedule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `sid_eid` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `study_group_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_unique`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `devices` ADD CONSTRAINT `devices_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `presences` ADD CONSTRAINT `presences_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `presences` ADD CONSTRAINT `presences_subject_schedule_id_foreign` FOREIGN KEY (`subject_schedule_id`) REFERENCES `subjects_schedules`(`subject_schedule_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `presences` ADD CONSTRAINT `presences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `presences_details` ADD CONSTRAINT `presences_details_presence_id_foreign` FOREIGN KEY (`presence_id`) REFERENCES `presences`(`presence_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `presences_details` ADD CONSTRAINT `presences_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_beacon_id_foreign` FOREIGN KEY (`beacon_id`) REFERENCES `beacons`(`beacon_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subjects_schedules` ADD CONSTRAINT `subjects_schedules_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subjects_schedules` ADD CONSTRAINT `subjects_schedules_study_group_id_foreign` FOREIGN KEY (`study_group_id`) REFERENCES `study_groups`(`study_group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subjects_schedules` ADD CONSTRAINT `subjects_schedules_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`subject_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subjects_schedules` ADD CONSTRAINT `subjects_schedules_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subjects_schedules` ADD CONSTRAINT `subjects_schedules_day_id_foreign` FOREIGN KEY (`day_id`) REFERENCES `days`(`day_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_study_group_id_foreign` FOREIGN KEY (`study_group_id`) REFERENCES `study_groups`(`study_group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
