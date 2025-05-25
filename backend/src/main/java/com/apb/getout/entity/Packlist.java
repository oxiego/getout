package com.apb.getout.entity;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "packlist")
@Getter
@Setter
@NoArgsConstructor
public class Packlist {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID uuid;

	@Column(name = "name")
	private String name;

	@ManyToMany
	@JoinTable(
	    name = "packlist_item",
	    joinColumns = @JoinColumn(name = "packlist_id"),
	    inverseJoinColumns = @JoinColumn(name = "item_id")
	)
	private List<Item> items;
}
