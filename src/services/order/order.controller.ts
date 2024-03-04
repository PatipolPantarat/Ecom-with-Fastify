import { FastifyRequest, FastifyReply } from "fastify";
import { OrderModel } from "../../models/order.model";
import { IOrder } from "../../utils/interfaces";

export async function getOrdersController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const orders = await OrderModel.find({});
    reply.code(200).send(orders);
  } catch (error) {
    reply.code(500).send(error);
  }
}

export async function getOrderController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const order = await OrderModel.findById(request.params.id);
    reply.code(200).send(order);
  } catch (err) {
    reply.code(500).send(err);
  }
}

export async function createOrderController(
  request: FastifyRequest<{ Body: IOrder }>,
  reply: FastifyReply
) {
  try {
    const newOrder = new OrderModel(request.body);
    await OrderModel.create(newOrder);
    reply.code(201).send(newOrder);
  } catch (err) {
    reply.code(500).send(err);
  }
}

export async function updateOrderController(
  request: FastifyRequest<{ Params: { id: string }; Body: IOrder }>,
  reply: FastifyReply
) {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    reply.code(200).send(updatedOrder);
  } catch (err) {
    reply.code(500).send(err);
  }
}

export async function deleteOrderController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(request.params.id);
    reply.code(200).send(deletedOrder);
  } catch (err) {
    reply.code(500).send(err);
  }
}
