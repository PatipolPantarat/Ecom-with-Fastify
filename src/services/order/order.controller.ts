import { FastifyRequest, FastifyReply } from "fastify";
import { OrderModel } from "../../models/order.model";
import { IOrder } from "../../utils/interfaces";
import createOrderJoiSchema from "../../schema/order/create.validate";
import { UserModel } from "../../models/user.model";
import changeStatusOrderJoiSchema from "../../schema/order/change.validate";

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
  // Validate request params
  const id = request.params.id;
  if (!id) {
    return reply.code(400).send({ error: "Order ID is required" });
  }
  try {
    // Find order by id
    const order = await OrderModel.findById(id).populate("products");
    reply.code(200).send(order);
  } catch (err) {
    reply.code(500).send(err);
  }
}

export async function createOrderController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Validate request body
  const { value, error } = createOrderJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }

  // Find user by id
  const user = await UserModel.findById(value.userId);
  if (!user) {
    return reply.code(404).send({ error: "User not found" });
  }

  try {
    // Create new order
    const newOrder = new OrderModel(value);
    await OrderModel.create(newOrder);

    // Add order to user
    user.orders.push(newOrder);
    await user.save();

    reply.code(201).send({ message: "Order created successfully" });
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

export async function changeStatusOrdersController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Validate request body
  const { value, error } = changeStatusOrderJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  try {
    await OrderModel.findByIdAndUpdate(value.orderId, {
      status: value.status,
    });
    reply.code(200).send({ message: "Order status updated successfully" });
  } catch (err) {
    reply.code(500).send(err);
  }
}
