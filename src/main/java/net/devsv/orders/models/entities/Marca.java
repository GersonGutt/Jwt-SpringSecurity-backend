package net.devsv.orders.models.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "marcas", schema = "public", catalog = "orders")

public class Marca implements Serializable{

	private static final long serialVersionUID = 1L;

	
		@Id
		@Column(name = "id", nullable = false)
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Integer id;
		
		@Column(name = "nombre", nullable = false, length = 80)
		private String nombre;
}
