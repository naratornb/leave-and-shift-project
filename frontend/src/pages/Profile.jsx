import {useState, useEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const {user} = useAuth(); // Access user token from context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    position: '',
    active: false,
    contact: {
      phone: '',
      address: ''
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      // Fetch profile data from the backend
      const fetchProfile = async () => {
          setLoading(true);
          try {
            const response = await axiosInstance.get('/api/auth/profile', {
              headers: {Authorization: `Bearer ${user.token}`},
            });
            setFormData({
              name: response.data.name,
              email: response.data.email,
              role: response.data.role || '',
              position: response.data.position || '',
              active: response.data.active || false,
              contact: {
                phone: response.data.contact?.phone || '',
                address: response.data.contact?.address || ''
              }
            });
          } catch
            (error) {
            alert('Failed to fetch profile. Please try again.');
          } finally {
            setLoading(false);
          }
        }
      ;

      if (user) fetchProfile();
    }, [user]
  )
  ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: {Authorization: `Bearer ${user.token}`},
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        [name]: value
      }
    });
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Name
          </label>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full mb-4 p-2 border rounded"
        />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Email
          </label>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full mb-4 p-2 border rounded"
        />
        </div>

        {/* Contact information */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.contact.phone}
            onChange={handleContactChange}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.contact.address}
            onChange={handleContactChange}
            rows="3"
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Read-only fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            id="role"
            type="text"
            value={formData.role}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
            Position
          </label>
          <input
            id="position"
            type="text"
            value={formData.position}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="active">
            Account Status
          </label>
          <input
            id="active"
            type="text"
            value={formData.active ? 'Active' : 'Inactive'}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
