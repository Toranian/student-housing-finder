
# class DataGenerator:
#     def __init__(self, n_samples=100):
#         self.n_samples = n_samples

#     def generatePosts(self):
#         posts = []
#         for i in range(self.n_samples):
#             post = Post(
#                 id=i,
#                 owner_id=i,
#                 created_at="2021-01-01",
#                 price=1000,
#                 location="Toronto",
#                 rent_start="2021-01-01",
#                 rent_end="2021-12-31",
#                 image="",
#                 description="",
#                 num_bedrooms=2,
#                 is_furnished=True,
#                 is_available=True,
#                 amenities=["gym", "pool"],
#                 property_type="condo"
#             )
#             posts.append(post)
#         return posts

class Post:
    def __init__(self, id=None, owner_id=None, created_at=None, price=None, location=None, rent_start=None, rent_end=None, image=None, description=None, num_bedrooms=None, is_furnished=False, is_available=True, amenities=None, property_type=None):
        self.id = id
        self.owner_id = owner_id
        self.created_at = created_at
        self.price = price
        self.location = location
        self.rent_start = rent_start
        self.rent_end = rent_end
        self.image = image
        self.description = description
        self.num_bedrooms = num_bedrooms
        self.is_furnished = is_furnished
        self.is_available = is_available
        self.amenities = amenities
        self.property_type = property_type

    def __str__(self):
        return (f"Post(id={self.id}, owner_id={self.owner_id}, created_at={self.created_at}, price={self.price}, "
                f"location='{self.location}', rent_start={self.rent_start}, rent_end={self.rent_end}, image='{self.image}', "
                f"description='{self.description}', num_bedrooms={self.num_bedrooms}, is_furnished={self.is_furnished}, "
                f"is_available={self.is_available}, amenities={self.amenities}, property_type={self.property_type})")
        
    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": "83d2c74c-005a-477a-ac0a-1d4f24a8ee04",
            "created_at": "2024-05-25 21:07:25.435454+00",
            "price": self.price,
            "location": self.location,
            "rent_start": self.rent_start,
            "rent_end": self.rent_end,
            "image": self.image,
            "description": self.description,
            "num_bedrooms": self.num_bedrooms,
            "is_furnished": self.is_furnished,
            "is_available": self.is_available,
            "amenities": self.amenities,
            "property_type": self.property_type
        }