package com.apb.getout.entity;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.UUID;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "item")
@Getter
@Setter
@NoArgsConstructor
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;

	@Column(name = "name")
	private String name;

	@Column(name = "manufactorer")
	private String manufactorer;

	@Column(name = "articleLink")
	private String articleLink;

	@Column(name = "description")
	private String description;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	@Embedded
	@AttributeOverrides({ @AttributeOverride(name = "height", column = @Column(name = "article_height")),
			@AttributeOverride(name = "width", column = @Column(name = "article_width")),
			@AttributeOverride(name = "length", column = @Column(name = "article_length")),
			@AttributeOverride(name = "unit", column = @Column(name = "article_unit")) })
	private Measure articleMeasure;

	@Embedded
	@AttributeOverrides({ @AttributeOverride(name = "height", column = @Column(name = "packed_height")),
			@AttributeOverride(name = "width", column = @Column(name = "packed_width")),
			@AttributeOverride(name = "length", column = @Column(name = "packed_length")),
			@AttributeOverride(name = "unit", column = @Column(name = "packed_unit")) })
	private Measure packedMeasure;

	@Column(name = "weight")
	private BigDecimal weight;

	@Column(name = "paidPrice")
	private BigDecimal paidPrice;

	@Column(name = "created")
	private Timestamp created;
	
	@Column(name = "image_data")
	private byte[] imageData;
	
	
}
