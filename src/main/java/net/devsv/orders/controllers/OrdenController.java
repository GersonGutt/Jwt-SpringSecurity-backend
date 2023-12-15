package net.devsv.orders.controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import net.devsv.orders.interfaces.IOrderService;
import net.devsv.orders.models.entities.Orden;
import net.devsv.orders.models.entities.Producto;
import net.devsv.orders.models.entities.Usuario;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api")
public class OrdenController {
	@Autowired
	private IOrderService ordenService;
	
	@GetMapping("/ordenes")	
	public List<Orden> getAllRecibidas(@RequestParam(name = "fecha",
			required = false) Date fecha){
		
		return ordenService.FindAll(fecha);	
	}
	
	@GetMapping("/ordenes/despachadas")	
	public List<Orden> getAllDespachadas(@RequestParam(name = "fecha",
			required = false) Date fecha){
		
		return ordenService.FindAllDespachadas(fecha);	
	}
	
	@GetMapping("/ordenes/cliente")
	public List<Orden> getOrderByUser(Integer id){
				return ordenService.FindOrdersByUser(id);
			}
	
	
	@GetMapping("/ordenes/anuladas")	
	public List<Orden> getAllAnuladas(@RequestParam(name = "fecha",
			required = false) Date fecha){
		return ordenService.FindAllAnuladas(fecha);	
	}
	
	@GetMapping("/ordenes/{id}")
	public ResponseEntity<?> getById(@PathVariable Integer id){
		Orden orden = null;
		Map<String, Object> response = new HashMap<>();
		try {
			orden = ordenService.findById(id);
		}catch(DataAccessException e) {
			response.put("message",
					"Error al realizar la consulta a la base de datos");
			response.put("error", e.getMessage());
		}
		if(orden == null) {
			response.put("message", "El producto con ID: "
					.concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Orden>(orden, HttpStatus.OK);
	}
	
	@PostMapping("/ordenes")
	public ResponseEntity<?> saveOrUpdate(@RequestBody Orden orden){
		Map<String, Object> response = new HashMap<>();
		Orden ordenReturn = null;
		try {
			ordenReturn = ordenService.saveOrUpdate(orden);
		}catch(DataAccessException e) {
			response.put("error", "Error al insertar la orden en la base de datos: "+e.getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		response.put("message", "Orden registrada con exito...!");
		response.put("orden", ordenReturn);
		return new ResponseEntity<Map<String, Object>>(response,HttpStatus.CREATED);
	}
	@PutMapping("ordenes/change-state")
	public ResponseEntity<?> changeState(@RequestBody Orden orden, 
			@RequestParam(name = "estado") String estado) {
			Map<String, Object> response = new HashMap<>(); 
			try {
				orden.setEstado(estado);
				if(estado.equals("D")) {
					Date fechaDesp = new Date();
				}
				ordenService.saveOrUpdate(orden);
			}
			catch(DataAccessException e) {
				response.put("message", "Error al cambiar el estado de la Orden");
				return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			String strEstado = estado.toString()=="D" ? "Despachada" : "Inactiva";
			
			response.put("message", "El estado del producto ha sido cambiado a: " +strEstado);
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.OK);
		}
}
