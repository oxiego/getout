package com.apb.getout.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.UUID;

import com.apb.getout.entity.Category;
import com.apb.getout.entity.Measure;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ItemDto {
	private UUID uuid;
	private String name;
	private String manufactorer;
	private String articleLink;
	private String description;
	private Category category;
	private Measure articleMeasure;
	private Measure packedMeasure;
	private BigDecimal weight;
	private BigDecimal paidPrice;
	private Timestamp created;
	private byte[] imageData;
	private String imageBase64;

}
