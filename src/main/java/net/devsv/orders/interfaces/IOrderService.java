package net.devsv.orders.interfaces;

import java.util.Date;
import java.util.List;

import net.devsv.orders.models.entities.Orden;
import net.devsv.orders.models.entities.Usuario;

public interface IOrderService {
	
	public List<Orden> FindAll(Date fecha);
	
	public List<Orden> FindAllDespachadas(Date fecha);

	public List<Orden> FindAllAnuladas(Date fecha);

	public List<Orden> FindOrdersByUser(Integer id);
	
	public Orden saveOrUpdate(Orden orden);
	
	public Orden changeState(Orden orden);
	
	public Orden findById(Integer id);

}
