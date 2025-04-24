package com.apb.getout.data;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.UUID;

import com.apb.getout.entity.CategoryEntity;
import com.apb.getout.entity.Measure;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Item {

	private UUID uuid;

	private String name;

	private String manufactorer;

	private String articleLink;

	private String description;

	private CategoryEntity category;

	private Measure articleMeasure;

	private Measure packedMeasure;

	private BigInteger weight;

	private BigDecimal paidPrice;

	private Timestamp created;

}
