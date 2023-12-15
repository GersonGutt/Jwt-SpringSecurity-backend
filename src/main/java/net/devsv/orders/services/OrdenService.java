package net.devsv.orders.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.devsv.orders.interfaces.IOrderService;
import net.devsv.orders.models.dao.IDetalleOrdenDao;
import net.devsv.orders.models.dao.IOrdenDAO;
import net.devsv.orders.models.entities.DetalleOrden;
import net.devsv.orders.models.entities.Orden;
import net.devsv.orders.models.entities.Usuario;

@Service
public class OrdenService implements IOrderService {
	
	@Autowired
	private IDetalleOrdenDao detalleOrdenDAO;
	@Autowired
	private IOrdenDAO OrdenDAO;

	@Override
	@Transactional(readOnly = true)
	public List<Orden> FindAll(Date fechaInicio) {
		// TODO Auto-generated method stub
		Date fechaFinal = null;
		if(fechaInicio != null) {
			Calendar c = Calendar.getInstance();
			c.setTime(fechaInicio);
			c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
			fechaFinal = c.getTime();
			return OrdenDAO.findAllRecibidasWithRangoFechas(fechaInicio, fechaFinal);
		}
		return OrdenDAO.FindAllRecibidas();
	}

	@Override
	@Transactional(readOnly = true)
	public List<Orden> FindAllDespachadas(Date fechaInicio) {
		// TODO Auto-generated method stub
		Date fechaFinal = null;
		if(fechaInicio != null) {
			Calendar c = Calendar.getInstance();
			c.setTime(fechaInicio);
			c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
			fechaFinal = c.getTime();
			return OrdenDAO.findAllDespachadasWithRangoFechas(fechaInicio, fechaFinal);
		}
		return OrdenDAO.FindAllDespachadas();
	}

	@Override
	@Transactional(readOnly = true)
	public List<Orden> FindAllAnuladas(Date fechaInicio) {
		// TODO Auto-generated method stub
		Date fechaFinal = null;
		if(fechaInicio != null) {
			Calendar c = Calendar.getInstance();
			c.setTime(fechaInicio);
			c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
			fechaFinal = c.getTime();
			return OrdenDAO.findAllAnuladasWithRangoFechas(fechaInicio, fechaFinal);
		}
		return OrdenDAO.FindAllAnuladas();
	}

	@Transactional
	@Override
	public Orden saveOrUpdate(Orden orden) {
		Orden ordenPersisted = null;
		try {
			if(orden.getId()== null) {
				//se va a crear un nuevo registro
				List<DetalleOrden> detalleOrden = orden.getDetalleOrden();
				orden.setDetalleOrden(new ArrayList<DetalleOrden>());
				//setiando el numero de ordenes
				orden.setCorrelativo(generarCorrelativo());
				//hacemos persistencia en orden
				ordenPersisted = OrdenDAO.save(orden);
			//recorriendo coleccion para guardar el detalle
				for(DetalleOrden detalle: detalleOrden) {
				detalle.setOrden(ordenPersisted);	
				}
				//guardamos todo el detalle de la orden
				detalleOrdenDAO.saveAll(detalleOrden);
			}else {
				//actualizacion
				for(DetalleOrden detalle: orden.getDetalleOrden()) {
					detalle.setOrden(orden);
				}
				ordenPersisted = OrdenDAO.save(orden);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return ordenPersisted;
	}

	@Override
	public Orden changeState(Orden orden) {
		// TODO Auto-generated method stub
		return OrdenDAO.save(orden);
	}

	@Override
	public Orden findById(Integer id) {
		// TODO Auto-generated method stub
		return OrdenDAO.findById(id).orElse(null);
	}
	
	private String generarCorrelativo() {
		//obteniendo la fecha del sistema 
		LocalDate currentDate = LocalDate.now();
		//obtener el anio y mes de la fecha
		String yearMonth = currentDate.format(DateTimeFormatter.ofPattern("yyyyMM"));
		//obteniendo el maximo correlativo para el anio y mes
		Long maxCorrelativo = OrdenDAO.findMaxCorrelativoByYearMonth(yearMonth);
		//calcular el proximo correlativo 
		Long nextCorrelativo = (maxCorrelativo != null) ? maxCorrelativo + 1 : 1;
		//formateando el numero de orden
		String numeroOrden = yearMonth + String.format("%04d", nextCorrelativo);
		return numeroOrden;
		
	}

	@Override
	public List<Orden> FindOrdersByUser(Integer id) {
		return OrdenDAO.FindOrdersByUser(id);
	}
}
