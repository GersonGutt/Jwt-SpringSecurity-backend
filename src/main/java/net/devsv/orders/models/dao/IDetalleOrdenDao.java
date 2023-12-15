package net.devsv.orders.models.dao;

import org.springframework.data.repository.CrudRepository;

import net.devsv.orders.models.entities.DetalleOrden;

public interface IDetalleOrdenDao extends CrudRepository<DetalleOrden, Integer> {

}
