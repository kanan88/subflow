import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription Name is required'],
      trim: true,
      minLength: 2,
      maxLength: 100
    },
    price: {
      type: Number,
      required: [true, 'Subscription Price is required'],
      min: [0, 'Subscription Price must be greater than 0']
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'GBP'],
      default: 'GBP'
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'annually']
    },
    category: {
      type: String,
      enum: ['entertainment', 'food', 'health', 'shopping', 'transport', 'travel', 'utilities', 'other'],
      required: true
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: value => value <= new Date(),
        message: 'Subscription Start Date must be in the past'
      }
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate
        },
        message: 'Subscription Renewal Date must after the Start Date'
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    }
  },
  { timestamps: true }
)

subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      annually: 365
    }

    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
  }

  if (this.renewalDate < new Date()) {
    this.status = 'expired'
  }

  next()
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription
