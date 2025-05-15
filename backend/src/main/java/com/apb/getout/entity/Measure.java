package com.apb.getout.entity;

import java.math.BigDecimal;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Measure {

	@Enumerated(EnumType.STRING)
	private MeasureUnit unit = MeasureUnit.CM;
	private BigDecimal height;
	private BigDecimal width;
	private BigDecimal length;
}
