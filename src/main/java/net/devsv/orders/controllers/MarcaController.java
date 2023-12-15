package net.devsv.orders.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import net.devsv.orders.interfaces.IMarcaService;
import net.devsv.orders.models.entities.Marca;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/api")
public class MarcaController {
	
	@Autowired
	private IMarcaService marcService;
	
	@GetMapping("/marcas")
	public List<Marca> getAll(){
		return marcService.findAll();
	}
	
	@GetMapping("/marcas/{id}")
	public ResponseEntity<?> getById(@PathVariable Integer id){
		Marca marca= null;
		Map<String, Object> response = new HashMap<>();
		try {
			marca = marcService.finById(id);
		}catch(DataAccessException e) {
			response.put("message", "Error al realizar la consulta a la base de datos");
			response.put("error", e.getMessage());
		}
		if(marca == null) {
			response.put("message", "La marca con ID: " .concat(id.toString().concat(" no existe en la base de datos")));
			return  new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Marca>(marca, HttpStatus.OK);
}
	//metodo para guardar una marca
		@PostMapping("/marcas")
		public ResponseEntity<?> save(@RequestBody Marca marca){
			Map<String, Object> response = new HashMap<>();
			try {
				//verificar si la categoria no existe en la base de datos
			  if(marcService.findByNombre(marca.getNombre()).size() > 0 && marca.getId() == null){
				  response.put("message", "ya existe una marca con éste nombre en la base de datos");
				  return  new ResponseEntity<Map<String, Object>>(response, HttpStatus.CONFLICT);
			  }else {
				  marca = marcService.save(marca);
			  }
				
			}catch(DataAccessException e) {
				response.put("message", "Error al realizar la consulta a la base de datos");
				response.put("error", e.getMessage());
				return  new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
				response.put("message", "Marca registrada con exito...");
				response.put("marca", marca);
				return  new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		
		}
		@PutMapping("/marcas/{id}")
		public ResponseEntity<?> updated(@RequestBody Marca marc, @PathVariable Integer id){
			Marca marcActual = marcService.finById(id);
			Marca marcUpdated = null;
			Map<String, Object> response = new HashMap<>();
			if(marcActual == null) {
				response.put("message", "Error: no se puede editar, la marca con ID:"
						.concat(id.toString().concat("no existe en la base de datos")));
				return  new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}
			try {
				marcActual.setNombre(marc.getNombre());
				marcUpdated = marcService.save(marcActual);
				
			}catch(DataAccessException e) {
				response.put("message", "Error al actualizar el registro, intente nuevamente");
				response.put("error", e.getMessage());
				return  new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			response.put("message","marca actualizada con exito...!");
			response.put("categoria", marcUpdated);
			return new ResponseEntity<Map<String, Object>>(response,HttpStatus.CREATED);
			
		}
		@DeleteMapping("/marcas/{id}")
		public ResponseEntity<?> delete ( @PathVariable Integer id){
			Map<String, Object> response = new HashMap<>();
			Marca marcActual = marcService.finById(id);
		
			if(marcActual == null) {
				response.put("message", "Error: no se puede eliminar, la marca con ID:"
						.concat(id.toString().concat("no existe en la base de datos")));
				return  new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}
			try {
				marcService.delete(id);
				
			}catch(DataAccessException e) {
				response.put("message", "No se puede eliminar la marca, ya tiene productos registrados ");
				return  new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			response.put("message","marca eliminada...!");
			return new ResponseEntity<Map<String, Object>>(response,HttpStatus.OK);
			
		}
	    
	}