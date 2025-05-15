package com.apb.getout.entity.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apb.getout.entity.Item;

public interface ItemRepository extends JpaRepository<Item, UUID> {}
