import { FastifyRequest, FastifyReply } from "fastify";
import { AddressModel } from "../../models/address.model";
import { UserModel } from "../../models/user.model";
import createAddressJoiSchema from "../../schema/address/create.validate";

export async function createAddressController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Validate request body
  const { value, error } = createAddressJoiSchema.validate(request.body);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }
  // Find user by email
  const user = await UserModel.findById(value.userId);
  if (!user) {
    return reply.code(404).send({ error: "User not found" });
  }
  try {
    // Create new address
    const newAddress = new AddressModel(value);
    await AddressModel.create(newAddress);
    // Save address to user
    user.addresses.push(newAddress);
    await user.save();
    // Return success message
    return reply.code(201).send({
      message: "Address created successfully",
    });
  } catch (err) {
    reply.code(500).send({ error: "Failed to create address" });
  }
}
