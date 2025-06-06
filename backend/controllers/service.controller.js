import Service from '../models/service.model.js';
import Expert from '../models/expert.model.js';

// ----------------------------
// Add new service by expert (Requires verifyExpert middleware)
// ----------------------------
export const addService = async (req, res) => {
  try {
    const { name, description, price, duration, timeSlots } = req.body;
    const expertId = req.expert._id;

    // Convert each time string to a Date object (on dummy date)
    const parsedTimes = Array.isArray(timeSlots)
      ? timeSlots.map(time => new Date(`1970-01-01T${time}`))
      : [];

    const newService = await Service.create({
      name,
      description,
      price,
      duration,
      expert: expertId,
      timeSlots: parsedTimes,
    });

    await Expert.findByIdAndUpdate(expertId, {
      $push: { services: newService._id }
    });

    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------------------
// Update service (only by the expert who owns it)
// ----------------------------
export const updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const expertId = req.expert._id;
    const updates = req.body;

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (service.expert.toString() !== expertId.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this service' });
    }

    // If timeSlots is passed, convert to Date objects
    if (updates.timeSlots) {
      updates.timeSlots = Array.isArray(updates.timeSlots)
        ? updates.timeSlots.map(time => new Date(`1970-01-01T${time}`))
        : [];
    }

    const updatedService = await Service.findByIdAndUpdate(serviceId, updates, { new: true });

    res.status(200).json({ message: 'Service updated', service: updatedService });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ----------------------------
// Delete service (only by the expert who owns it)
// ----------------------------
export const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const expertId = req.expert._id;

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (service.expert.toString() !== expertId.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this service' });
    }

    await Service.findByIdAndDelete(serviceId);

    await Expert.findByIdAndUpdate(expertId, {
      $pull: { services: serviceId }
    });

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const getAllServices = async (req, res) => {
  try {
    const search = req.query.search || "";
    const searchWords = search.split(" ").filter(Boolean); // ["hello", "mota", "bhai"]

    // Build dynamic $or query with $regex for each word and field
    const searchQuery = {
      $or: searchWords.flatMap(word => [
        { name: { $regex: word, $options: 'i' } },
        { description: { $regex: word, $options: 'i' } }
      ])
    };

    const services = await Service.find(searchQuery)
      .populate('expert', 'name aboutMe photo')
      .populate({
        path: 'reviews',
        populate: {
          path: 'expert',
          select: 'name aboutMe photo',
        },
      });

    // Also filter on expert name manually (since regex on populated fields won't work directly)
    const filteredServices = services.filter(service =>
      searchWords.some(word =>
        service.expert?.name?.toLowerCase().includes(word.toLowerCase())
      )
    );

    // Combine both direct matches and manual expert name matches
    const finalServices = [...new Set([...services, ...filteredServices])];

    res.status(200).json(finalServices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ----------------------------
// Get services of a specific expert (public)
// ----------------------------
export const getExpertServices = async (req, res) => {
  try {
    const expertId = req.params.expertId;
    const services = await Service.find({ expert: expertId })
      .populate({
        path: 'reviews',
        populate: {
          path: 'expert',
          select: 'name photo',
        },
      });

    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------------------
// Get single service by ID (public)
// ----------------------------
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id)
      .populate('expert', 'name email aboutMe photo')
      .populate({
        path: 'reviews',
        populate: {
          path: 'expert',
          select: 'name photo',
        },
      });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
