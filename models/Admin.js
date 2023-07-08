const {Schema, model} = require("mongoose")

const AdminSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
          },
          message: 'Please provide a valid email address'
        }
      },
      phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (phone) {
            const phoneRegex = /^\d{8}$/;
            return phoneRegex.test(phone);
          },
          message: 'Please provide a valid 8-digit phone number'
        }
      },
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      hash: {
        type: String,
        required: true
      },
      salt: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'admin'
      },
      modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'admin'
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      modifiedAt: {
        type: Date,
        default: Date.now
      }
    },
    { timestamps: true }
  );

module.exports = model("admin",AdminSchema);