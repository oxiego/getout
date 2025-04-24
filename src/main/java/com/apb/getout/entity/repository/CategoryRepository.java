package com.apb.getout.entity.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apb.getout.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, UUID>{}
